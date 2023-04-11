import React from 'react';
import { useSelector } from "react-redux";
import { ArrowSwapHorizontal } from 'iconsax-react';

function Logo({ hide, hideSide, toggleSide }) {
  const isLoading = useSelector((state) => state?.brand?.loading);
  const brand = useSelector((state) => state?.brand?.brand);

  if (isLoading) return null;

  return (
    <div
      className={`flex items-center justify-between h-20 pl-5 transition-all ${
        hideSide ? 'w-[95px]' : 'w-[250px]'
      } ${hide ? 'bg-[#0C0D0F]' : 'bg-[#0C0D0F]'}`}
    >
      <div className="flex items-center ">
        {/* <img src={brand.base64Logo} alt="" className="w-12 mr-2 height-12" /> */}
        {!hideSide && (
          <div className="p-2 px-3">
            <p className="logoname-menu">Pan<span style={{color:'#0096C7'}}>sophy</span></p>
          </div>
        )}
      </div>

      {!hide && (
        <div
          className="hamburger pr-2 pl-2 flex items-center justify-center hover:bg-black/[.2] transition-all"
          onClick={toggleSide}
          onKeyPress={toggleSide}
          role="button"
          tabIndex={0}
          style={{ height: '100%' }}
        >
          <ArrowSwapHorizontal color="white" variant="Outline" style={hideSide ? {transform: 'scaleX(-1)', display:'initial'}: {} } className="swapicon"/>
        </div>
      )}
    </div>
  );
}

export default Logo;
