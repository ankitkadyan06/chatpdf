import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import dfos from '../assets/images/dfosLogo.svg';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../assets/css/Sidebar.css';
import textImg from '../assets/images/textImg.svg'
import { useNavigate } from 'react-router-dom';
import documentImg from '../assets/images/documentIcon.svg'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

const names = ['javascript', 'Van Henry', 'April Tucker'];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const SideBar = () => {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [uploadedFileName, setUploadedFileName] = useState(''); 
  const navigate = useNavigate();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleDrop = (acceptedFiles) => {
    // Assuming you want to display the name of the first uploaded file
    if (acceptedFiles.length > 0) {
      setUploadedFileName(acceptedFiles[0].name);
    }
  };

  return (
    <div className="bg-[#001529] h-[100vh]">
      <img src={dfos} alt="" className="ml-[20%] pt-[18px] pb-[17px] cursor-pointer" onClick={()=>{navigate('/')}} />
      <hr className="border-[1px] border-solid border-[#CACACA] w-[90%] ml-[5%]" />
      <FormControl sx={{ m: 1, width: 210, mt: 3 }} className="ml-[10px]">
        <Select
          multiple
          displayEmpty
          className="text-white"
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <div className="font-poppins">
                <div className='flex'>
                  <img src={documentImg} alt="" />
                  <p className='relative left-[12px] top-[8px]'>My Document</p>
                </div>
              </div>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
        >
         
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="dropzone text-center border-[2px] border-dashed border-[#A9A9A9] rounded-[6px] w-[90%] h-[90px] ml-[10px] mt-[15px] cursor-pointer bg-[#2D445B]"
          >
            <input {...getInputProps()} />
            <p className="text-[16px] font-inter text-white">
              <span className="text-[25px]">+</span> New Chat
            </p>
            <p className="text-[#D9D9D9] text-base font-inter">Drop PDF here</p>
          </div>
        )}
      </Dropzone>
      {uploadedFileName && (
        <div className="text-white ml-[10px] mt-4 flex bg-[#1677FF] rounded-[7px] px-[13px] py-[5px] mx-[10px] cursor-pointer">
          <img src={textImg} alt="" />
          <p className='ml-[7px] mt-[10px]' style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>{uploadedFileName}</p>
        </div>
      )}
    </div>
  );
};

export default SideBar;
