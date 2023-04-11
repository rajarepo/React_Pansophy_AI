import React from 'react';

function Error404() {
    return (
        <div className="flex h-screen">
            <div className="col-md-6 my-auto p-10 md:p-20">
                <div>
                    <img src="/icon/logo.svg" alt="" className="w-20 h-20" />
                    <h3 className="text-4xl text-white font-normal mt-5">title</h3>
                    <p className=" mb-5 text-base custom-text-light">
                        description
                    </p>
                </div>
            </div>

            <div className="col d-none d-md-flex items-center justify-center  bg-custom-secondary">
                <img src="/icon/error404.svg" alt="" />
            </div>
        </div>
    );
}

export default Error404;
