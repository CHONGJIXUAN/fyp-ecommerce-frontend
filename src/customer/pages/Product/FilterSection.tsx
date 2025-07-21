import { Button, Divider, dividerClasses, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { green } from '@mui/material/colors'
import { colors } from 'data/Filter/color'
import { price } from 'data/Filter/price'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChangeEvent } from 'react';
import { discount } from 'data/Filter/discount'

const FilterSection = () => {
   const [expandColor, setExpandColor] = useState(false);
   const [searchParams, setSearchParams] = useSearchParams();
   const handleColorToggle = () => {
        setExpandColor(!expandColor);
   }
   
   const updateFilterParams = (e: any) => {
    const {value, name} = e.target;
    if(value){
        searchParams.set(name, value);
    }else{
        searchParams.delete(name);
    }
    setSearchParams(searchParams);
   }

   const clearAllFilters = () => {
        searchParams.forEach((_, key) => {
            searchParams.delete(key);
        });
        setSearchParams(searchParams);
    };

  return (
    <div className='-z-50 space-y-5 bg-white '>
        <div className='flex items-center justify-between h-[40px] px-9 lg:border-r'>
            <p className='text-lg font-semibold'>Filters</p>
            <Button onClick={clearAllFilters} size="small" className="text-green-800 cursor-pointer font-semibold">Clear All</Button>
        </div>
        <Divider/>
        <div className='px-9 space-y-6'>
            <section>
                <FormControl>
                    <FormLabel 
                    sx={{fontSize:"16px", fontWeight:"bold", color: green[800], pb:"14px"}} 
                    className='text-2x1 font-semibold' id="color">Color</FormLabel>
                    <RadioGroup
                        aria-labelledby="color"
                        defaultValue=""
                        name="color"
                        onChange={updateFilterParams}
                    >
                        {colors.slice(0, expandColor ? colors.length : 5).map((item) => 
                        <FormControlLabel value={item.name} control={<Radio />} 
                            label={
                                <div className='flex items-center gap-2'>
                                    <p>{item.name}</p>
                                    <p style={{backgroundColor:item.hex}} 
                                    className={`h-5 w-5 rounded-full ${item.name === "White" ? "border" : ""}`}>
                                    </p>    

                                </div>
                            } 
                        />)}
                    </RadioGroup>
                </FormControl>
                <div className='text-primary cursor-pointer hover:text-green-800 flex items-center'>
                    <button onClick={handleColorToggle}>
                        {expandColor ? "Hide" : `+${colors.length - 5} more`}
                    </button>
                </div>
            </section>
            <section>
                <FormControl>
                    <FormLabel 
                    sx={{fontSize:"16px", fontWeight:"bold", color: green[800], pb:"14px"}} 
                    className='text-2x1 font-semibold' id="price">Price</FormLabel>
                    <RadioGroup
                        aria-labelledby="price"
                        onChange={updateFilterParams}
                        name="price"
                    >
                        {price.map((item) => 
                        <FormControlLabel 
                            value={item.value} 
                            control={<Radio size="small" />}
                            key={item.name} 
                            label={item.name} 
                        />)}
                    </RadioGroup>
                </FormControl>
            </section>
            {/* <section>
                <FormControl>
                    <FormLabel 
                    sx={{fontSize:"16px", fontWeight:"bold", color: green[800], pb:"14px"}} 
                    className='text-2x1 font-semibold' id="brand">Discount</FormLabel>
                    <RadioGroup
                        aria-labelledby="brand"
                        onChange={updateFilterParams}
                        name="discount"
                    >
                        {discount.map((item) => 
                        <FormControlLabel 
                            value={item.value} 
                            control={<Radio size="small" />}
                            key={item.name} 
                            label={item.name} 
                        />)}
                    </RadioGroup>
                </FormControl>
            </section> */}
        </div>
    </div>
  )
}

export default FilterSection