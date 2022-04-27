import styles from './property.module.css'

const FilterBar = ()=>{
    return(
        <div className={styles.filterSearchBar}>
            <input className={styles.searchBar} placeholder='Search'></input>
            <div className={styles.filterSearchBarButton}>Filter</div>
            <select className={styles.filterSearchBarButton}>
                <option>HDB</option>
                <option>Condominium</option>
                <option>Apartment</option>
            </select>
            <div className={styles.filterSearchBarButton}>Price</div>
            <div className={styles.filterSearchBarButton}>Bedroom</div>
        </div>
    )
}

export default FilterBar