
import Layout from '@/components/Layout'
import { Inter } from '@next/font/google'
import Link from 'next/link'
import { useState, useEffect } from 'react'



export default function Home({styles,pokedata}) {
  //console.log(pokedata)
  const [searchresults, setsearchresults]= useState(pokedata)
  const [pokeArr, setpokeArr] = useState(searchresults.slice(0,20))
  const [pageno, setpageno] = useState(0)
  const [input,setInput]= useState("")
  const [filter,setFilter] = useState("All")
  
  //console.log(pokeArr)
  useEffect(() => {
    setpokeArr(pokedata.slice(pageno*20,(pageno*20)+20))
  
  }, [pageno])
  useEffect(()=>{
    setpokeArr(searchresults.slice(0,20))
  },[searchresults])
  useEffect(()=>{
    if(input.length===0 && filter==="All"){
    setsearchresults(pokedata)
    return
    }
    if(input.length!==0 && filter==="All"){
      setsearchresults(c=>(pokedata.filter((pokeman)=>{
        return pokeman.name.english.toLowerCase().includes(input.toLowerCase())
      })))
      return 
    }
    if(input.length===0 && filter!=="All"){
      setsearchresults(c=>(pokedata.filter((pokeman)=>{
        return pokeman.type.includes(filter)
      })))
      return 
    }
    if(input.length!==0 && filter!=="All"){
      setsearchresults(c=>(pokedata.filter((pokeman)=>{
        return pokeman.type.includes(filter) && pokeman.name.english.toLowerCase().includes(input.toLowerCase())
      })))
      return 
    }
  },[input,filter])
  
  const handlePrev=()=>{
    setpageno(c=>{return c-1})
  }
  const handleNext=()=>{
    setpageno(c=>{return c+1})
  }
  const handleFilterChange=(e)=>{
    setFilter(e.target.value)
  }
  const handleInputChange=(e)=>{
    setInput(e.target.value)
  }
  return (
    <Layout title={"POKEDEX"}>
      <div className='flex justify-center mt-12'>
        <input type="text" placeholder='search' className='searchbox sm:w-3/4' onChange={handleInputChange} value={input}></input>
      </div>
      <div className='flex justify-center sm:px-10 py-4 items-center'>
        <select name='types' id='types' defaultValue={"All"} className="searchbox sm:p-2.5 border-none" onChange={handleFilterChange} value={filter}>
        <option value="All" >
              All
            </option>
            <option value="Normal">Normal</option>
            <option value="Fire">Fire</option>
            <option value="Water">Water</option>
            <option value="Electric">Electric</option>
            <option value="Grass">Grass</option>
            <option value="Ice">Ice</option>
            <option value="Fighting">Fighting</option>
            <option value="Poison">Poison</option>
            <option value="Ground">Ground</option>
            <option value="Flying">Flying</option>
            <option value="Psychic">Psychic</option>
            <option value="Bug">Bug</option>
            <option value="Rock">Rock</option>
            <option value="Ghost">Ghost</option>
            <option value="Dragon">Dragon</option>
            <option value="Dark">Dark</option>
            <option value="Steel">Steel</option>
            <option value="Fairy">Fairy</option>
        </select>
      </div>
      <div className='flex flex-wrap justify-center mx-auto mt-20'>
        {
          pokeArr.map((pokeman,i)=>{
            return(
              <div key={pokeman.name.english} className='p-4'> 
              <Link href={`/pokemons/${pokeman.id}`}>
                <div className='pokebox py-4 px-6'> 
                  <img src={pokeman.image.hires} alt='' className='h-[153px] w-[152px] sm:h-[200px] sm:w-[200px]'></img>
                  <div className='text-center'>
                    {
                      pokeman.type.map((type,j)=>{
                        return(
                          <span key={type} className='text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded' style={{backgroundColor:styles[type.toLowerCase()]}}>{type}</span>
                        )
                      })
                    }
                  </div>
                  <p className='text-center'>
                  <span className='font-semibold text-2xl mr-2'>
                    {
                      `${pokeman.id}.`
                    }
                  </span>
                  <span className='text-2xl'>
                    {pokeman.name.english}
                  </span>
                  </p>
                  
                </div></Link>
              </div>
            )
          })
        }
      </div>
      <div className='container mx-auto flex flex-wrap justify-between pb-8 '>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500' onClick={handlePrev} disabled={pageno===0?true:false}>Previous</button><button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500' onClick={handleNext} disabled={searchresults.length/20-pageno<1?true:false  }>Next</button>
      </div>
    </Layout>
  )
}

export async function getStaticProps(){
  try {
    const res=await fetch("https://api.pikaserve.xyz/pokemon/all")
    const data= await res.json()
    return{
      props:{
        pokedata:data,
        styles: {
          normal: "#A8A77A",
          fire: "#EE8130",
          water: "#6390F0",
          electric: "#F7D02C",
          grass: "#7AC74C",
          ice: "#96D9D6",
          fighting: "#C22E28",
          poison: "#A33EA1",
          ground: "#E2BF65",
          flying: "#A98FF3",
          psychic: "#F95587",
          bug: "#A6B91A",
          rock: "#B6A136",
          ghost: "#735797",
          dragon: "#6F35FC",
          dark: "#705746",
          steel: "#B7B7CE",
          fairy: "#D685AD",
        }, 
      },
    };
  } catch (error) {
    console.log(error)
  }
}