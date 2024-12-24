import React, {FC} from 'react'
import styles from './Pagination.module.css'
import clsx from "clsx";
interface PaginationProps {
    currentPage: number;
    pageCount:number;
    onPageChange: (page:number) => void;
    maxPageCount:number;
}

const Pagination:FC<PaginationProps> = ({currentPage,pageCount,onPageChange,maxPageCount}) => {
    const setPrevPage = ()=>{
        if(currentPage>1){onPageChange(currentPage-1)}
    }
    const setNextPage = ()=>{
        if(currentPage<pageCount){onPageChange(currentPage+1)}
    }
    let from:number;
    let count:number;
    let pages:Array<number> = [];
    count = pageCount<maxPageCount?pageCount:maxPageCount
    if(currentPage<maxPageCount/2){
        from=1;
    }else if (pageCount-currentPage<maxPageCount/2){
        if(count>=maxPageCount)
            from=pageCount-maxPageCount+1;
        else
            from=1
    }else{
        from = currentPage-Math.floor(maxPageCount/2)
    }
    for (let i = 0;i<count;i++){
        pages.push(from+i)
    }
    return (
        <div className={styles.pagination}>
            <button onClick={setPrevPage} className={clsx(styles.btn, styles.prev)}>Prev</button>
            {pages.map((value) => {
                return <button onClick={() => {
                    onPageChange(value)
                }} key={value} className={clsx(styles.btn, value === currentPage && styles.selectedBtn)}>{value}</button>
            })}
            <button onClick={setNextPage} className={clsx(styles.btn, styles.next)}>Next</button>
        </div>
    )
};
export default React.memo(Pagination);