import React from "react";
import Responsive from 'react-responsive';
// eslint-disable-next-line 
import styles from "../css/footer.css";

function FooterMobile(props){
        return <span>
                        <div className="footer-left">
                            <p className="footer-company-name">FlashcardX &copy; 2018</p>
                            <div className="footer-icons">
                                <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/CardsFlashx"><i className="fa fa-facebook"></i></a>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/flashcardx"><i className="fa fa-instagram"></i></a>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/flashcardx/"><i className="fa fa-linkedin"></i></a>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UCLWNRfWMM0VyonqoSSLXzaA/videos"><i className="fa fa-youtube"></i></a>
                                <a target="_blank" rel="noopener noreferrer" href="https://github.com/flashcardx"><i className="fa fa-github"></i></a>
                            </div>
                            <div>
                                <i className="fa fa-envelope"></i>
                                <p><a href="mailto:contact@flashcardx.co">contact@flashcardx.co</a></p>
                            </div>
                        </div>
                </span> 
}

function FooterDesktop(props){
    return   <span>
                  <div className="footer-left">
                    <div><img alt="flashcardx logo" className="footer-logo" src={process.env.PUBLIC_URL+"/img/logo_text_white.png"}/></div>
    
                    <p className="footer-links">
                        Aprende de todo con fichas multimedia
                    </p>
    
                    <p className="footer-company-name">FlashcardX &copy; 2018</p>
                </div>
    
                <div className="footer-center">
    
                    <div>
                        <i className="fa fa-map-marker"></i>
                        <p> Buenos Aires, Argentina</p>
                    </div>
    
                    <div>
                        <i className="fa fa-phone"></i>
                        <p>+54 911 30530305</p>
                    </div>
    
                    <div>
                        <i className="fa fa-envelope"></i>
                        <p><a href="mailto:contact@flashcardx.co">contact@flashcardx.co</a></p>
                    </div>
    
                </div>
    
                <div className="footer-right">
    
                    <p className="footer-company-about">
                        <span>Acerca de nosotros</span>
                        FlashcardX es una plataforma de aprendizaje, con la mision de convertirse en una herramienta para optimizar el aprendizaje de casi cualquier cosa. <strong>Somos un proyecto open source</strong>
                    </p>
    
                    <div className="footer-icons">
                        <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/CardsFlashx"><i className="fa fa-facebook"></i></a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/flashcardx"><i className="fa fa-instagram"></i></a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/flashcardx/"><i className="fa fa-linkedin"></i></a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UCLWNRfWMM0VyonqoSSLXzaA/videos"><i className="fa fa-youtube"></i></a>
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/flashcardx"><i className="fa fa-github"></i></a>
                    </div>
                </div>
         </span> 
}

function Footer(props){
   return <Responsive minWidth={700}>
    {(matches) => {
        if (matches)
            return FooterDesktop(props)
        return FooterMobile(props)
    }}
    </Responsive>
}

export default Footer;