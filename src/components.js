import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";

const getToken = () => jwt.sign({
  exp: (() => Math.floor(Date.now() / 1000) + 60)(),
  "iss": "learn-web-dev-camper-key"
}, "web-dev-camper-secret");

export const Interface = (props) => {
    return(
        <div className = 'main'>
            <GetTitles/>
            <GetSkills/>
        </div>
    );
}



// The only thing you should change in the fetch itself is where it says `title`, `python`, or `50` to change the search type, text, or limit, respectively.
// Unless you're feeling _really_ brave, don't change title to anything other than `skills`

function GetTitles() {
    const [titles, setTitles] = useState();

    useEffect(() => {
        fetch("https://emsiservices.com/emsi-open-proxy-service/postings/us/taxonomies/title?q=python&limit=100", {
            headers: {
            "Content-Type": "application/json",      
            authorization: `Bearer ${getToken()}`,
            },
        }).then(res => res.json()).then(res => {setTitles(res.data); console.log(res.data)})
    }, [])

    const loaded = titles && titles.length

    return(
        <ul>
            {loaded ?  titles.map((title) => <JobTitlesItem title = {title['name']} key = {title['id']}/>): <div>Loading</div>}
        </ul>
    );
} 

const JobTitlesItem = (props) =>    {
    return(
            <li>
                <input type = 'checkbox'></input>
                <span>{props.title}</span>
            </li>
    );
}



function GetSkills() {
    const [skills, setSkills] = useState();

    useEffect(() => {
        fetch("https://emsiservices.com/emsi-open-proxy-service/postings/us/taxonomies/skills?q=python&limit=100", {
            headers: {
            "Content-Type": "application/json",      
            authorization: `Bearer ${getToken()}`,
            },
        }).then(res => res.json()).then(res => {setSkills(res.data); console.log(res.data)})
    }, [])

    const loaded = skills && skills.length

    return(
        <ul>
            {loaded ?  skills.map((skill) => <JobSkillsItem skill = {skill['name']} key = {skill['id']}/>): <div>Loading</div>}
        </ul>
    );
} 

const JobSkillsItem = (props) =>    {
    return(
            <li>
                <input type = 'checkbox'></input>
                <span>{props.skill}</span>
            </li>
    );
}











// return(
    //     <ul>
    //         {setTimeout(() => {
    //             return(
    //                 titles.map((title, index) => {
    //                     <JobTitlesItem title = {title}/>
    //                 })
    //             );
    //         }, 1000)}
    //     </ul>
// );

    // function makeList() {
    //     return(
    //         titles.data.map((title, index) => {
    //             <JobTitlesItem title = {title}/>
    //         })
    //     );
    // }
    
    // 



// const Button = (props) =>    {
//     return(
//         <button onClick = {GetTitles}></button>
//     );
// }

// const JobTitlesList = (props) =>    {
//     return(

//     );
// }