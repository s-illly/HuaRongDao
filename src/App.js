import createBoard from './createBoard';
import { useEffect, useState } from "react"
import './App.css';
import {blank1, blank2} from './createBoard'
import { MOVE_DIR } from './moveDir';
import { getMoveDirection } from './getMoveDirection';
import { getDownBlocks } from './getBlock';
import { getUpBlocks } from './getBlock';
import { getLeftBlocks } from './getBlock';
import { getRightBlocks } from './getBlock';

function App() {
  const [blocks, setBlocks] = useState([])
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  function findBlockItem(arr, id) {
    return arr.filter((el) => el.id === id )[0];
  }

  useEffect(() => {
    setBlocks(createBoard())    
  }, [])

  const dragStart = (e) => {
    console.log(e.target)
    setSquareBeingDragged(e.target)
  }
  const dragEnd = (e) => {
    //console.log(e.target)
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('block-id'))
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('block-id'))
    console.log(squareBeingDraggedId)
    console.log(squareBeingReplacedId)
    if (squareBeingReplacedId && squareBeingReplacedId ){
      if(squareBeingDraggedId === blank1.id || squareBeingDraggedId === blank2.id ){
        console.log("Dragged a blank block")
        return
      }
      if(squareBeingReplacedId !== blank1.id && squareBeingReplacedId !== blank2.id){
        console.log("Dropped on a non-blank block")
        return
      }
      let sBlock = findBlockItem(blocks, squareBeingDraggedId)
      let dBlock = findBlockItem(blocks, squareBeingReplacedId)
      console.log(sBlock)
      console.log(dBlock)
      const move = getMoveDirection(sBlock, dBlock)
      if(move === MOVE_DIR.INVALID_MOVE)
        return

      if(move === MOVE_DIR.MOVE_DOWN){
        console.log(move)
        if(sBlock.width === 1){
          dBlock.positionY = sBlock.positionY
          sBlock.positionY += 1
        } else{
          let [b1,b2] = getDownBlocks(blocks, sBlock)
          console.log(b1, b2)

          if(b1!==null && b2!== null){
            console.log("valid move down")
            b1.positionY = b2.positionY = sBlock.positionY
            sBlock.positionY += 1   
          }
        }
      }

      else if(move === MOVE_DIR.MOVE_UP){
        console.log(move)
        if(sBlock.width === 1){
          dBlock.positionY = sBlock.positionY + sBlock.height - 1
          sBlock.positionY -= 1
        } else{
          let [b1,b2] = getUpBlocks(blocks, sBlock)
          console.log(b1, b2)

          if(b1!==null && b2!== null){
            console.log("valid move up")
            b1.positionY = b2.positionY = sBlock.positionY + sBlock.height - 1
            sBlock.positionY -= 1   
          }
        }
      }

      else if(move === MOVE_DIR.MOVE_LEFT){
        console.log(move)
        if(sBlock.height === 1){
          dBlock.positionX = sBlock.positionX + sBlock.width - 1
          sBlock.positionX -= 1
        } else{
          let [b1,b2] = getLeftBlocks(blocks, sBlock)
          console.log(b1, b2)
          console.log("lefttt")

          if(b1!==null && b2!== null){
            console.log("valid move left")
            b1.positionX = b2.positionX = sBlock.positionX + sBlock.width - 1
            sBlock.positionX -= 1   
          }
        }
      }

      else if(move === MOVE_DIR.MOVE_RIGHT){
        console.log(move)
        if(sBlock.height === 1){
          dBlock.positionX = sBlock.positionX
          sBlock.positionX += 1
        } else{
          let [b1,b2] = getRightBlocks(blocks, sBlock)
          console.log(b1, b2)

          if(b1!==null && b2 !== sBlock){
            console.log("valid move right")
            b1.positionX = b2.positionX = sBlock.positionX
            sBlock.positionX += 1   
          }
        }
      }

      setBlocks([...blocks])
    }
  }

  const dragDrop = (e) => {
    console.log(e.target)
    setSquareBeingReplaced(e.target)
  }

   return (
    <div className="App">
      <div className="game">
        {blocks.map((block,index) => (
            <img 
              key = {index}
              src={block.image}
              style={{width: block.width*70, height: block.height*70, position: 'absolute', top: block.positionY * 70, left: block.positionX * 70}}
              alt={block.name}
              block-id={block.id}

              draggable={true}
              onDragStart={dragStart}

              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
             
              onDragEnd={dragEnd}
              onDrop={dragDrop}

              />
        ))}

      </div>
    </div>
  );

}

export default App;
