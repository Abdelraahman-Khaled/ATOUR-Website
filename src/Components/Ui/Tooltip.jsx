import React from "react"; 
 import "./Tooltip.css"; 
 
 const TooltipExample = ({ title }) => { 
   return ( 
     <div className="tooltip-container"> 
       <span className="exclamation">!</span> 
       <span className="tooltip-text">{title}</span> 
     </div> 
   ); 
 }; 
 
 export default TooltipExample;