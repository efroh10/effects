import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

const getToken = () => jwt.sign({
    exp: (() => Math.floor(Date.now() / 1000) + 60)(),
    "iss": "learn-web-dev-camper-key"
  }, "web-dev-camper-secret");

export function GetTitles() {
    const [titles, setTitles] = useState();
    const [hires, setHires] = useState([]);
    const [hireCount, setHireCount] = useState(0);
    const [increase, setIncrease] = useState(true);
    const [color, setColor] = useState('red');
    const [skills, setSkills] = useState();
    const [demandedSkills, setDemandedSkills] = useState([]);

    useEffect(() => {
        fetch("https://emsiservices.com/emsi-open-proxy-service/postings/us/taxonomies/title?q=python&limit=100", {
            headers: {
            "Content-Type": "application/json",      
            authorization: `Bearer ${getToken()}`,
            },
        }).then(res => res.json()).then(res => setTitles(res.data))
    }, [])

    useEffect(() => {
        fetch("https://emsiservices.com/emsi-open-proxy-service/postings/us/taxonomies/skills?q=python&limit=100", {
            headers: {
            "Content-Type": "application/json",      
            authorization: `Bearer ${getToken()}`,
            },
        }).then(res => res.json()).then(res => setSkills(res.data))
    }, [])

    useEffect(() => {
        let newDemandedSkills = [...demandedSkills];
        let loaded = skills && skills.length;
        if(loaded && increase){
            (hireCount <= skills.length -1 && hireCount > 0) ? newDemandedSkills.push(skills[hireCount - 1]) : setDemandedSkills(newDemandedSkills);
        }                                                                                                    //newDemandedSkills.push(skills[hireCount - (skills.length - 1)
        setDemandedSkills(newDemandedSkills);
    }, [hireCount, skills])

    useEffect(() => {
        (color === 'green') ? setColor('red') : setColor('green');
        console.log(color);
    }, [increase])

    function RenderSkills() {
        let loaded = demandedSkills && demandedSkills.length;
        const SkillsItem = (props) =>    {
            return(
                    <li>
                        <span>{props.skill}</span>
                    </li>
            );
        }

        return(
            <div>
                <h1>Skills In Demand:</h1>
                <ul>
                    {loaded ?  demandedSkills.map((skill, index) => <SkillsItem skill = {skill['name']} key = {index}/>): <div></div>}
                </ul>
            </div>
        );
    }

    

    function IncreaseCount()    {
        let newCount = hireCount;
        newCount++;
        setHireCount(newCount);
        setIncrease(true);
    }

    function DecreaseCount()    {
        let newCount = hireCount;
        newCount--;
        setHireCount(newCount);
        setIncrease(false);
    }

    function HireCount()    {
        console.log(color);
        return(
            <span className = {color}>{hireCount}</span>
        );
    }

    function AddHireTitles(id)    {
        let newHires = [...hires]; //why do i need spread here?
        let addition = titles[id];
        newHires.push(addition);
        setHires(newHires);
        IncreaseCount();
    }

    function RemoveHireTitles(id)   {
        let newHires = [...hires];
        newHires.splice(id, 1);
        setHires(newHires);
        DecreaseCount();
    }

    const HireTitlesItem = (props) =>   {
        return(
            <li>
                <button onClick = {() => RemoveHireTitles(props.index)}>Remove</button>
                <span>{props.hire}</span>
            </li>
        );
    }

    function HireTitles() {
        let selected = hires;

        return(
            <div>
                <h1>Titles to Hire: <HireCount/></h1>
                {/* when do we use {} and when <>? */}
                <ul>
                    {selected && hires.map((hire, index) => <HireTitlesItem hire = {hire['name']}  id = {index} key = {hire['id']}/>)}
                </ul>
            </div>
        );
    }

    const JobTitlesItem = (props) =>    {
        return(
                <li>
                    <button onClick = {() => AddHireTitles(props.index)}>Add</button>
                    <span>{props.title}</span>
                </li>
        );
    }
    const loaded = titles && titles.length

    return(
        <div className = 'titles'>
            <div>
                <h1>Titles:</h1>
                <ul>
                    {loaded ?  titles.map((title, index) => <JobTitlesItem title = {title['name']} index = {index} key = {index}/>): <div>Loading</div>}
                </ul>
            </div>
            <HireTitles/>
            <RenderSkills/>
        </div>
    );
} 