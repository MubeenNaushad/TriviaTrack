
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function RichTextEditor({input,setInput}) {

  const handlechange=(content)=>{
        setInput({...input,description:content})
  }
  return <ReactQuill theme="snow" value={input.description} onChange={handlechange} />;
}

export default RichTextEditor