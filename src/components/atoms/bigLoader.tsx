import React from 'react';
import DpLogo from "@/../public/logo/logo-inline.png";
import Image from 'next/image';

const BigLoader = () => {
    return (
        <div className="m-auto w-screen h-screen flex flex-col justify-center items-center gap-5 ">
            <span className='pulse w-12 h-12'></span>
            <Image src={DpLogo} alt="Loading..." width={400} height={100} />
        </div>
    );
};

export default BigLoader;
