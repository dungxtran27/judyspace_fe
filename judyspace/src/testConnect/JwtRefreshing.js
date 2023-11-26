import axios from "axios";
import { useEffect } from "react";

export default function JwtRefreshing() {
    const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refereshToken");
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await fetch("http://localhost:8080/api/users/getCurrentUserInfo", {
                    method: "GET",
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                      "Content-Type": "application/json",
                    },
                    credentials: "include"
                  })
                    .then((response) => {
                      if(response.status===200){
                        response.json().then((data)=>{
                            console.log(data);
                        })
                      }else{
                        response.json().then((data)=>{
                            console.log("vao roi");
                            console.log(data);
                        })
                      }
                    })
                    
                
            }catch(error){
                console.log(error);
            }
        }
        fetchData();
    }, [])

    return(
        <div>hehe</div>
    );
}