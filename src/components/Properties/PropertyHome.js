import { useNavigate } from "react-router-dom"
import styles from './property.module.css'

//todo home screen
const PropertyHome = ()=>{
    const navigate = useNavigate();
    return(
        <div className={styles.mainContainer}>
            <div className={styles.homepageImageContainer}>
                <img className={styles.homepageImage} src='assets/icons/HomePage.jpg' alt='propertyHomeImage'></img>
            </div>
            <div className={styles.linkContainer}>
                <button className={styles.links} style={{color:'white'}} onClick={()=>{navigate('/properties/rent'); window.scrollTo(0, 0)}}>Rent</button>
                <button className={styles.links} style={{color:'white'}} onClick={()=>{navigate('/properties/sale'); window.scrollTo(0, 0)}}>Buy</button>
            </div>
            <div className={styles.horizontal}>
                <div className={styles.sidebar}>
                    <img src='/assets/icons/AskGuruLogo.svg' alt='askGuru' className={styles.sidebarImage}></img>
                    <p style={{fontSize:'22px', padding: '10px'}}>How Do I Rent A Property In Singapore</p>
                    <p style={{padding: '10px', fontSize: '14px'}}>Get answers from PropertyLah experts</p>
                    <button className={styles.sidebarButtons} >Ask a Question</button>
                    <button className={styles.sidebarButtons} onClick={()=>navigate('/qna')}>Browse Answers</button>
                </div>
                <div className={styles.sidebar}>
                    <img src='/assets/icons/Books.jpg' alt='askGuru' className={styles.sidebarImage}></img>
                    <p style={{fontSize:'22px', padding: '10px'}}>Stay Up-to-Date</p>
                    <p style={{padding: '10px', fontSize: '14px'}}>Find out more about the latest news and trends in the property market</p>
                    <button className={styles.sidebarButtons} onClick={()=>navigate('/articles')}>Read Articles</button>
                </div>
            </div>
        </div>
    )
}

export default PropertyHome