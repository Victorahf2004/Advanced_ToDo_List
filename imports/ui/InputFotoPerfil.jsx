import React from "react";
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';

export const InputFotoPerfil = ({ chave, inputs, handleChange }) => {

    const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
    
      const reader = new FileReader();
      reader.onload = () => {
        handleChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ButtonBase
      component="label"
      role={undefined}
      tabIndex={-1}
      aria-label="Avatar image"
      sx={{
        borderRadius: '40px',
        '&:has(:focus-visible)': {
          outline: '2px solid',
          outlineOffset: '2px',
        },
      }}
    >
      <Avatar alt="Upload new avatar" src={inputs[chave]} />
      <input
        type="file"
        accept="image/*"
        style={{
          border: 0,
          clip: 'rect(0 0 0 0)',
          height: '1px',
          margin: '-1px',
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          whiteSpace: 'nowrap',
          width: '1px',
        }}
        onChange={handleAvatarChange}
      />
    </ButtonBase>
  );
}