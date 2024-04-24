import React from "react";



let Loader = () => {
    return (
        <React.Fragment>
           <div className="row mt-5">
            <div className="col-5 m-auto text-center">
            <div className="custom-spinner">
                <div className="spinner-border text-primary">Loading...</div>
            </div>
            </div>
           </div>
        </React.Fragment>
    )
};
export default Loader;