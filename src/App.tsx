import styles from './App.module.css'
import {useCallback, useEffect, useState} from "react";
import useDebounce from "./hooks/debounce.ts";
import {ICharacter, IData, Status} from "./types.ts";
import Pagination from "./components/Pagination/Pagination.tsx";
import Character from "./components/Character/Character.tsx";

function App() {
    const [characters, setCharacters] = useState<ICharacter[]>([]);
    const[search, setSearch] = useState<string>('')
    const[page, setPage] = useState<number>(1)
    const[pageCount, setPageCount] = useState<number>(5)
    const[status, setStatus] = useState<Status>(Status.Any)
    const [debouncedSearch] = useDebounce(search, 500);
    useEffect(()=>{
        let url = new URL('https://rickandmortyapi.com/api/character/');
        if(debouncedSearch.length>0)url.searchParams.set('name',debouncedSearch)
        if(status!=Status.Any)url.searchParams.set('status',status)
        url.searchParams.set('page',page+'')
        fetch(url.href)
            .then((data)=>(data.json()))
            .then((data:IData)=>{
                if(data.results) {
                    setCharacters(data.results)
                    setPageCount(data.info.pages)
                    if (page > data.info.pages) setPage(1)
                }else{
                    setCharacters([])
                }
            }
        )
    },[debouncedSearch,status,page])
    const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{setSearch(event.target.value);setPage(1)}
    const handleChangeStatus=(event: React.ChangeEvent<HTMLSelectElement>)=>{setStatus(event.target.value as Status); setPage(1)}

    const handleChangePage = useCallback((page:number)=>{
        setPage(page)
    },[])

    return (
    <>
      <header className={styles.header}><img src="/header.jpg" alt=""/></header>
        <div className={styles.characters}>
            <div className={styles.charactersTop}>
                <h2 className={styles.title}>Персонажи</h2>
                <input value={search} className={styles.input} type="text" placeholder={'Имя персонажа'} onChange={handleChange}/>
                <select value={status} className={styles.input} onChange={handleChangeStatus}>
                    <option value={Status.Any}>Любой статус</option>
                    <option value={Status.Alive}>Живой</option>
                    <option value={Status.Dead}>Мертвый</option>
                    <option value={Status.Unknown}>Неизвесто</option>
                </select>
            </div>
            <ul className={styles.charactersList}>
                {characters.length>0?characters.map((item) => (
                    <li key={item.id}><Character character={item}/></li>
                )):<p style={{fontSize:"20px"}}>По запросу ничего не найдено</p>}
            </ul>
            <div className={styles.pagination}>
                <Pagination pageCount={pageCount} maxPageCount={5} currentPage={page} onPageChange={handleChangePage}/>
            </div>
        </div>
    </>
  )
}

export default App
