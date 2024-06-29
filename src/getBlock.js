
import {blank1,blank2} from "./createBoard"
function getBlock(blocks, x,y)
{
    const block = blocks.filter( (e) => (e.positionX === x && e.positionY === y) )[0]
    if(block.id === blank1.id || block.id === blank2.id)
        return block
    return null
}

export function getDownBlocks(blocks, sBlock){
    const x = sBlock.positionX
    const y = sBlock.positionY + sBlock.height
    let block1 = getBlock(blocks, x,y)
    const x1 = x + 1
    let block2 = getBlock(blocks, x1, y)
    return [block1, block2]
}

export function getUpBlocks(blocks, sBlock){
    const x = sBlock.positionX
    const y = sBlock.positionY - 1
    let block1 = getBlock(blocks, x,y)
    const x1 = x + 1
    let block2 = getBlock(blocks, x1, y)
    return [block1, block2]
}

export function getLeftBlocks(blocks, sBlock){
    const x = sBlock.positionX - 1
    const y = sBlock.positionY
    let block1 = getBlock(blocks, x,y)
    const y1 = y + 1
    let block2 = getBlock(blocks, x, y1)
    return [block1, block2]
}

export function getRightBlocks(blocks, sBlock){
    const x = sBlock.positionX + sBlock.width
    const y = sBlock.positionY 
    let block1 = getBlock(blocks, x,y)
    const y1 = y + 1
    let block2 = getBlock(blocks, x, y1)
    return [block1, block2]
}