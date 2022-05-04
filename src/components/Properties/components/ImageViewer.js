import styles from '../property.module.css'
import { useState } from 'react'

const ImageViewer = (props)=>{
    const [image, setImage] = useState(0)
    return(
        <>
            <img className={styles.image} src={props.source[image]} alt='image1' />   
            {image === 0? <button className={styles.imageButtonPrev} style={{padding:'0px'}} onClick={(e)=>{e.stopPropagation()}}><>&lt;</></button>
            :<button className={styles.imageButtonPrev} style={{padding:'0px'}} onClick={(e)=>{e.stopPropagation(); setImage(image-1)}}><>&lt;</></button>}
            {image === props.source.length-1? <button className={styles.imageButtonNext} style={{padding:'0px', left:'538px'}} onClick={(e)=>{e.stopPropagation()}}><>&gt;</></button>
            :<button className={styles.imageButtonNext} style={{padding:'0px', left:'538px'}} onClick={(e)=>{e.stopPropagation(); setImage(image+1)}}><>&gt;</></button>}
        </>
    )
}


export default ImageViewer