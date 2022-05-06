import styles from '../property.module.css'
import { useState } from 'react'

const ImageViewer = (props)=>{
    const [image, setImage] = useState(0)
    return(
        <>
            <img data-testid={'scrollingImage'} className={styles.image} src={props.source[image]} alt='image1' />   
            {image === 0? <button data-testid={'prevButton'} className={styles.imageButtonPrev} style={{padding:'0px'}} onClick={(e)=>{e.stopPropagation()}}><>&lt;</></button>
            :<button data-testid={'prevButton'} className={styles.imageButtonPrev} style={{padding:'0px'}} onClick={(e)=>{e.stopPropagation(); setImage(image-1)}}><>&lt;</></button>}
            {image === props.source.length-1? <button data-testid={'nextButton'} className={styles.imageButtonNext} style={{padding:'0px', left:'538px'}} onClick={(e)=>{e.stopPropagation()}}><>&gt;</></button>
            :<button data-testid={'nextButton'} className={styles.imageButtonNext} style={{padding:'0px', left:'538px'}} onClick={(e)=>{e.stopPropagation(); setImage(image+1)}}><>&gt;</></button>}
        </>
    )
}


export default ImageViewer