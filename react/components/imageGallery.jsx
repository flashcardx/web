import React, {Component} from "react";
import Radium from "radium";
import _ from "lodash";
import CroppedImage from "./util/croppedImage.jsx";
import OwlCarousel from "react-owl-carousel";
import css from "../../public/css/imageGallery.css";

export default Radium(function({imgs}){
    var bottomFiller = null;
    var content = null;
    if(_.isEmpty(imgs))
        content = <CroppedImage width="100%"
                height="200px" src="/assets/img/no-image.png"/>
    else
        content = <OwlCarousel
                        dotsClass="owl-dots"
                        lazyLoad={true}
                        className="owl-theme"
                        items={1}>
                        {imgs.map((img, index)=>{
                            if(index == 0)
                                return <CroppedImage width="auto" height="200px"
                                            style={img.style}
                                            key={img.src}
                                            onClick={img.onClick}
                                            src={img.src}/>
                            else
                                return <CroppedImage width="auto" height="200px"
                                            style={img.style}
                                            key={img.src}
                                            onClick={img.onClick}
                                            data-src={img.src}/>
                        })}
                    </OwlCarousel>
    return (<div>
            {content}
            {bottomFiller}
            </div>);
});