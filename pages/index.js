
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
      <div className='mt-12 searchbox'>
        <input type="text" placeholder='search' className='bg-transparent focus:outline-0 search sm:w-3/4 ' onChange={handleInputChange} value={input}></input>
      </div>
      <div className='flex justify-center sm:px-10 py-4 items-center'>
        
        <div class="inline-flex border-none mt-10" role="group">
          <button className='filter font-medium text-sm px-4 py-3 mr-2 text-gray-900 focus:ring focus:ring-violet-300' onClick={handleFilterChange} value="Normal">Normal</button>
          <button className='filter font-medium text-sm px-6 py-3 mr-2 text-gray-900 focus:ring focus:ring-violet-300' onClick={handleFilterChange} value="Fire">Fire</button>
          <button className='filter font-medium text-sm px-4  py-3 mr-2 text-gray-900 focus:ring focus:ring-violet-300'onClick={handleFilterChange} value="Water">Water</button>
          <button className='filter font-medium text-sm px-4 py-3 mr-2 text-gray-900 focus:ring focus:ring-violet-300'onClick={handleFilterChange} value="Electric">Electric</button>
          <button className='filter font-medium text-sm px-4 py-1 mr-2 text-gray-900 focus:ring focus:ring-violet-300'onClick={handleFilterChange} value="Grass">Grass</button>
          <button className='filter font-medium text-sm px-7 py-1 mr-2 text-gray-900 focus:ring focus:ring-violet-300'onClick={handleFilterChange} value="Ice">Ice</button>
          <button className='filter font-medium text-sm px-4 py-1 mr-2 text-gray-900 focus:ring focus:ring-violet-300'onClick={handleFilterChange} value="Fighting">Fighting</button>
          <button className='filter font-medium text-sm px-4 py-1 mr-2 text-gray-900 focus:ring focus:ring-violet-300'onClick={handleFilterChange} value="Poison">Poison</button>
          <button className='filter font-medium text-sm px-4 py-1 mr-2 text-gray-900 focus:ring focus:ring-violet-300'onClick={handleFilterChange} value="Ground">Ground</button>
          <button className='filter font-medium text-sm px-4 py-1 mr-2 text-gray-900 focus:ring focus:ring-violet-300'onClick={handleFilterChange} value="Flying">Flying</button>
          <button className='filter font-medium text-sm px-4 py-1 mr-2 text-gray-900 focus:ring focus:ring-violet-300'onClick={handleFilterChange} value="Psychic">Psychic</button>
          <button className='filter font-medium text-sm px-7 py-1 mr-2 text-gray-900 focus:ring focus:ring-violet-300'onClick={handleFilterChange} value="Bug">Bug</button>
          <button className='filter font-medium text-sm px-4 py-1 mr-2 text-gray-900 focus:ring focus:ring-violet-300'onClick={handleFilterChange} value="Rock">Rock</button>
          <button className='filter font-medium text-sm px-4 py-1 mr-2 text-gray-900 focus:ring focus:ring-violet-300'onClick={handleFilterChange} value="Ghost">Ghost</button>
          <button className='filter font-medium text-sm px-4 py-1 mr-2 text-gray-900 focus:ring focus:ring-violet-300'onClick={handleFilterChange} value="Dragon">Dragon</button>
          <button className='filter font-medium text-sm px-4 py-1 mr-2 text-gray-900 focus:ring focus:ring-violet-300'onClick={handleFilterChange} value="Dark">Dark</button>
          <button className='filter font-medium text-sm px-4 py-1 mr-2 text-gray-900 focus:ring focus:ring-violet-300'onClick={handleFilterChange} value="Steel">Steel</button>
          <button className='filter font-medium text-sm px-4 py-1 mr-2 text-gray-900 focus:ring focus:ring-violet-300'onClick={handleFilterChange} value="Fairy">Fairy</button>
        </div>


      </div>
      
      <div className='flex justify-center sm:px-10  items-center'>
      <button className='filter  font-medium text-sm px-10 py-3 mr-2 text-gray-900 focus:ring focus:ring-violet-300' onClick={handleFilterChange} value="All">All</button>

      </div>

      <div className='flex flex-wrap justify-center mx-auto mt-10'>
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
      <div className='pagination pb-8 '>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 butt rounded disabled:bg-gray-500' onClick={handlePrev} disabled={pageno===0?true:false}>Previous</button><button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500' onClick={handleNext} disabled={searchresults.length/20-pageno<1?true:false  }>Next</button>
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
