import {useRouter} from "next/Router"
import { useEffect, useState } from "react";
// import styles from './../../styles/Home.module.css'
import Link from "next/link";
import styles from "../../styles/Details.module.css";



export default function Details() {
    const { query: {id}} = useRouter();

    const [pokemon, setPokemon] = useState(null);
  
  useEffect(() => {
    async function getPokemon() {
      const resp = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`);
      setPokemon(await resp.json())
    }
    if(id){
        getPokemon();
    }

  },[]);

  if(!pokemon){
    return null;
  }


    
    return (<div>
        
       <head>

        <title>{pokemon.name}</title>

       </head>
       <div>
        <Link href="/">
            Back to Home
        </Link>
       </div>

       <div className={styles.layout}>
        <div>
            <img
             className={styles.picture}
             src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
             alt={pokemon.name.english}
            />
        </div>
        <div>
            <div className={styles.name}>{pokemon.name}</div>
            <div className={styles.type}> {pokemon.type.join(". ")}</div>
            <table>
            <thead className={styles.header}>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                { pokemon.stats.map(({name, value}) => (
                <tr key={name}>
                    <td className={styles.attribute}>{name}</td>
                    <td>{value}</td>
                </tr>
               ) )}

            </tbody>

            </table>
       
        </div>

       </div>
        </div>)
}