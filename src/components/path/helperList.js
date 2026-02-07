import React , {useState , useEffect, useRef} from 'react';
import Header from '../Header';
import Footer from '../Footer';
import QuickSearch from '../Quicksearch';
import { Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { toast } from 'react-toastify';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import MenSmall from "../../images/mensmall.jpg"
import { getHelpersList, getFilterList, getFilterData } from '../../apiCalls';

const useStyles = makeStyles((theme) => ({
  circularImage: {
    borderRadius: '50%',
    maxWidth: '170px', 
    margin: 'auto',
    display: 'block',
  },
}));



const FilterList = () => {

    const classes = useStyles();
    const [helpers, setHelpers] = useState([]);
    const filtersRef = useRef(null);
    const navigate = useNavigate();


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; // Number of items per page, adjust as needed
  
    const handlePageChange = (event, value) => {
      setCurrentPage(value);
      filtersRef.current.scrollIntoView({ behavior: 'smooth' });
    };
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = helpers.slice(indexOfFirstItem, indexOfLastItem);
  

    const [nationalities , setNationality ] = useState();
    const [ages , setAges ] = useState();
    const [heights , setHeights ] = useState();
    const [weights , setWeightList ] = useState();
    const [englishProficiencies , setEnglishProfiency ] = useState();
    const [helperTypes , setHelperTypes ] = useState();
    const [workingExperiences , setExperience ] = useState();
    const [skills , setSkills ] = useState();
    const [religions , setReligions ] = useState();
    const [maritalStatusList , setMaritalStatusList ] = useState();


    const [selectednationality, setSelectedNationality] = useState([]);
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [englishProficiency, setEnglishProficiency] = useState('');
    const [helperType, setHelperType] = useState([]);
    const [workingExperience, setWorkingExperience] = useState([]);
    const [skill, setSkill] = useState([]);
    const [religion, setReligion] = useState([]);
    const [maritalStatus, setMaritalStatus] = useState([]);
  
    useEffect(() => {
      getHelpersList()
        .then(data => {
            if(data.Message === "Sucess"){
                setHelpers(data.Data);
            }else{
                toast.error("error getting helpers")
            }
        })
        .catch(error => {
          toast.error(error);
          console.error('Error fetching helpers:', error);
        });
    }, []);

console.log("helpers list",helpers);


    useEffect(() => {
        getFilterList()
          .then(data => {
              if(data.Message === "Sucess"){
                if(data.Data.length){
                    const response = data.Data[0];
                    setNationality(response.Nationality);
                    setHeights(response.Height);
                    setAges(response.Age)
                    setWeightList(response.Weight)
                    setEnglishProfiency(response.EnglishProficiency)
                    setHelperTypes(response.HelperType)
                    setExperience(response.WorkingExperience)
                    setSkills(response.Skills)
                    setReligions(response.Religion)
                    setMaritalStatusList(response.MaritalStatus)
                }
              }else{
                  toast.error("error getting helpers")
              }
          })
          .catch(error => {
            toast.error(error);
            console.error('Error fetching helpers:', error);
          });
      }, []);
    
      const handleChange = (setter) => (event) => {
        const {
          target: { value },
        } = event;
        setter(typeof value === 'string' ? value.split(',') : value);
      };
    
      const handleSingleChange = (setter) => (event) => {
        setter(event.target.value);
      };
    
      const resetAll = () => {
        setSelectedNationality([]);
        setAge('');
        setHeight('');
        setWeight('');
        setEnglishProficiency('');
        setHelperType([]);
        setWorkingExperience([]);
        setSkill([]);
        setReligion([]);
        setMaritalStatus([]);
      };


    const handleFilters = () => {
        const postData = {
            Nationality : selectednationality,
            Age : age,
            Height : height,
            Weight : weight,
            Profiency : englishProficiency,
            HelperType : helperType,
            Experience : workingExperience,
            Skills : skill,
            Religion : religion,
            MaritalStatus : maritalStatus
          };

        getFilterData(postData)
        .then(data => {
            if(data.Message === "Sucess"){
                setHelpers(data.Data);
            }else{
                toast.error("error getting helpers")
            }
        })
        .catch(error => {
          toast.error(error);
          console.error('Error fetching helpers:', error);
        });
    }

    const handleHelperBio = (code) => {
        window.location.href = `/helper_details?${code}` ;
    }





  return(
    <div>
    <div id="wrapper">
    <Header/>
    <div className="clear"></div>

    <div className="clear"></div>
    <div className="main-content-wrapper"> 
    
        <div className="bannerWrapper">
        <div className="banner inner-banner">
            <div className="inner-banner-img img-holder img-cover">
            <figure><img src="images/banner-news.jpg" alt="JPB"/></figure>
            </div>
        </div>
        <div ref={filtersRef} className="home-banner-bottom-bg inner-banner-shape">
                    <img src="images/inner-banner-shape.png" alt=""/>
                    </div> 
        </div>
        <div className="clear"></div>
    
        <section className="fullcontainer news-section1" data-aos="fade-up">
        <div className="float-icon s5 left-img-1 tp15 left5" data-aos="fade-right"><img src="images/left-img-1.png" alt="" className="responsive"/></div>
        <div className="float-icon s7 right-img-2 tp10 right5" data-aos="fade-left"><img src="images/right-img-1.png" alt="" className="responsive"/></div>
        <div className="float-icon s7 we-img-3 tp20 right30" data-aos="fade-left"><img src="images/we-img-3.png" alt="" className="responsive"/></div>
        <div className="float-icon we-img-1 tp25 left25" data-aos="fade-right"><img src="images/we-img-1.png" alt="" className="responsive"/></div>
        <div className="float-icon s6 we-img-4 tp45 right5" data-aos="fade-left"><img src="images/we-img-4.png" alt="" className="responsive"/></div>
        <div className="inner-container">
            <div className="container">
                <div className="pageTitle text-center title-border">
                <h2>Helpers</h2>
                </div>

                <Grid>
                    <Grid container>
                        <Accordion sx={{width:{md:"95%" , sm:'100%' , xs:'100%'}}}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            >
                                <Typography  gutterBottom variant="h6" component="div" sx={{fontWeight:'bold'}}>
                                    Filters
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>

                            <Grid>
                                <Grid container justifyContent="space-between">
                                    <Grid item xs={12} sm={5.9} md={2.9} mt={1}>
                                    <FormControl sx={{ width: '100%' }}>
                                        <InputLabel id="demo-multiple-checkbox-label">Nationality</InputLabel>
                                        <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={selectednationality}
                                        onChange={handleChange(setSelectedNationality)}
                                        input={<OutlinedInput label="Nationality" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        >
                                        {nationalities && nationalities.length && nationalities.map((name) => (
                                            <MenuItem key={name} value={name}>
                                            <Checkbox checked={selectednationality.indexOf(name) > -1} />
                                            <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={5.9} md={2.9} mt={1}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Age"
                                        onChange={handleSingleChange(setAge)}
                                        >
                                        {ages && ages.length && ages.map((ageRange) => (
                                            <MenuItem key={ageRange} value={ageRange}>{ageRange}</MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={5.9} md={2.9} mt={1}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Height</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={height}
                                        label="Height"
                                        onChange={handleSingleChange(setHeight)}
                                        >
                                        {heights && heights.length && heights.map((heightOption) => (
                                            <MenuItem key={heightOption} value={heightOption}>{heightOption}</MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={5.9} md={2.9} mt={1}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Weight</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={weight}
                                        label="Weight"
                                        onChange={handleSingleChange(setWeight)}
                                        >
                                        {weights && weights.length && weights.map((weightOption) => (
                                            <MenuItem key={weightOption} value={weightOption}>{weightOption}</MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={5.9} md={2.9} mt={1}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">English Proficiency</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={englishProficiency}
                                        label="English Proficiency"
                                        onChange={handleSingleChange(setEnglishProficiency)}
                                        >
                                        {englishProficiencies && englishProficiencies.length && englishProficiencies.map((proficiency) => (
                                            <MenuItem key={proficiency} value={proficiency}>{proficiency}</MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={5.9} md={2.9} mt={1}>
                                    <FormControl sx={{ width: '100%' }}>
                                        <InputLabel id="demo-multiple-checkbox-label">Helper Type</InputLabel>
                                        <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={helperType}
                                        onChange={handleChange(setHelperType)}
                                        input={<OutlinedInput label="Helper Type" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        >
                                        {helperTypes && helperTypes.length && helperTypes.map((type) => (
                                            <MenuItem key={type} value={type}>
                                            <Checkbox checked={helperType.indexOf(type) > -1} />
                                            <ListItemText primary={type} />
                                            </MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={5.9} md={2.9} mt={1}>
                                    <FormControl sx={{ width: '100%' }}>
                                        <InputLabel id="demo-multiple-checkbox-label">Working Experience</InputLabel>
                                        <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={workingExperience}
                                        onChange={handleChange(setWorkingExperience)}
                                        input={<OutlinedInput label="Working Experience" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        >
                                        {workingExperiences && workingExperiences.length && workingExperiences.map((experience) => (
                                            <MenuItem key={experience} value={experience}>
                                            <Checkbox checked={workingExperience.indexOf(experience) > -1} />
                                            <ListItemText primary={experience} />
                                            </MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={5.9} md={2.9} mt={1}>
                                    <FormControl sx={{ width: '100%' }}>
                                        <InputLabel id="demo-multiple-checkbox-label">Skills</InputLabel>
                                        <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={skill}
                                        onChange={handleChange(setSkill)}
                                        input={<OutlinedInput label="Skills" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        >
                                        {skills && skills.length && skills.map((skillOption) => (
                                            <MenuItem key={skillOption} value={skillOption}>
                                            <Checkbox checked={skill.indexOf(skillOption) > -1} />
                                            <ListItemText primary={skillOption} />
                                            </MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={5.9} md={2.9} mt={1}>
                                    <FormControl sx={{ width: '100%' }}>
                                        <InputLabel id="demo-multiple-checkbox-label">Religion</InputLabel>
                                        <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={religion}
                                        onChange={handleChange(setReligion)}
                                        input={<OutlinedInput label="Religion" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        >
                                        {religions && religions.length && religions.map((religionOption) => (
                                            <MenuItem key={religionOption} value={religionOption}>
                                            <Checkbox checked={religion.indexOf(religionOption) > -1} />
                                            <ListItemText primary={religionOption} />
                                            </MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={5.9} md={2.9} mt={1}>
                                    <FormControl sx={{ width: '100%' }}>
                                        <InputLabel id="demo-multiple-checkbox-label">Marital Status</InputLabel>
                                        <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={maritalStatus}
                                        onChange={handleChange(setMaritalStatus)}
                                        input={<OutlinedInput label="Marital Status" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        >
                                        {maritalStatusList && maritalStatusList.length && maritalStatusList.map((status) => (
                                            <MenuItem key={status} value={status}>
                                            <Checkbox checked={maritalStatus.indexOf(status) > -1} />
                                            <ListItemText primary={status} />
                                            </MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent="space-between" mt={2}>
                                    <Grid item>
                                    <Button variant="contained" onClick={resetAll}>Reset All</Button>
                                    </Grid>
                                    <Grid item>
                                    <Button variant="contained" onClick={handleFilters}>Search</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>

                <Grid>
                    <Grid container sx={{justifyContent: {md:"space-between" , sm:'center' , xs:'center'}}}>
                        {currentItems && currentItems.length > 0 && currentItems.map((item, index) => (
                            
                            <Grid item md={3.9} mt={4} key={index}>
                                <Card sx={{ maxWidth: 270, height:350, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Grid container justifyContent="center" mt={2} mb={2}>
    {item.PersonImagePath ? (
        <img 
            src={item.PersonImagePath === "string" || item.PersonImagePath === ""?MenSmall:item.PersonImagePath} 
            alt="Profile Image" 
            style={{ border: '1px solid grey', width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} 
        />
    ) : (
        <CardMedia
            className={classes.circularImage}
            component="img"
            image="https://image.freepik.com/free-vector/user-icon_126283-435.jpg"
            title="Default Profile Image"
            sx={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
        />
    )}
</Grid>
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div" sx={{fontWeight:'bold', textAlign:'center'}}>
                                            {item.FullName}
                                        </Typography>
                                        <Grid sx={{width: 300}}>
                                            <Grid container justifyContent='space-between'>
                                                <Grid item md={6}>
                                                    <Grid container direction='column'>
                                                        <Grid item>
                                                            <Typography variant="body2" color="text.primary">
                                                                BirthPlace
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="body2" color="text.primary">
                                                                MaritalStatus
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="body2" color="text.primary">
                                                                BasicSalary
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="body2" color="text.primary">
                                                                DateOfBirth
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item md={6}>
                                                    <Grid container direction='column'>
                                                        <Grid item>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {item.BirthPlace || "-"}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {item.MaritalStatus || "-"}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="body2" color="text.secondary">
                                                                S$ {item.BasicSalary || "-"}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {item.DateOfBirthString || "-"}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <CardActions>
                                    <div style={{ paddingLeft:"65px", paddingBottom:"20px"}}>
                                        <Button size="small" >
                                            <Link to={`/helper_details?${item.CVCode}`} onClick={(e)=>{handleHelperBio(item.CVCode)}}>
                                                More Details <i class="fa fa-arrow-right" aria-hidden="true"></i>
                                            </Link>
                                        </Button>
                                        </div>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                        <Grid item xs={12} mt={4}>
                            <Pagination
                            count={Math.ceil(helpers.length / itemsPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            />
                        </Grid>
                    </Grid>
                </Grid>


            </div>
        </div>
        <div className="footer-space"></div>
        </section>
    
        
        <div className="clear"></div>
    </div>

    <div className="clear"></div>
    <div className="pushContainer"></div>
    <div className="clear"></div>
    </div>
    <Footer/>
    <QuickSearch/>
    </div>
  );
}
export default FilterList;

