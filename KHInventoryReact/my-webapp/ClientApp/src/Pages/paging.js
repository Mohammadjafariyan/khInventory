import React, { Component } from "react";




export const  pagingComponent=(total,lastTake,lastSkip,parent,funcName) => {

    debugger;
    let partCount = total / lastTake + total % lastTake;
    let currentPart = 1;
    if (lastSkip) {
      currentPart = total / lastSkip + total % lastSkip;
    }

    let arr = [];
    for (let i = 1; i <= partCount; i++) {
      arr.push(i);
    }

    

    return (<div>
      {arr.map(i => {
          if (i==lastSkip+1){
              return <button style={{color:'blue'}} onClick={() => {
 
                  parent[funcName](lastTake, i * lastTake -1);
              }}>{i}</button>;
          }else{
              return <button onClick={() => {

                  parent[funcName](lastTake, i * lastTake -1);
              }}>{i}</button>;
          }
          
   
      })}
    </div>);
}



