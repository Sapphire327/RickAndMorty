import {FC} from 'react'
import {ICharacter, Status} from "../../types.ts";
import styles from './Character.module.css'
import clsx from "clsx";

const Character:FC<{character:ICharacter}> = ({character}) => {
    return (
        <div className={styles.character}>
            <img src={character.image} alt=""/>
            <div className={styles.info}>
                <h3 className={styles.name}>{character.name}</h3>
                <p className={clsx(styles.prop,character.status === Status.Alive && styles.greenCircle, character.status === Status.Dead && styles.redCircle)}>Status: {character.status}</p>
                <p className={styles.prop}>Species: {character.species}</p>
            </div>
        </div>
    )
};
export default Character;