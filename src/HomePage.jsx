import { Link, useNavigate } from 'react-router-dom';
import discours from './assets/eyewitness_7658662.png'
import reunion from './assets/podium_2063626.png'
import documents from './assets/google-docs_2991106.png'
import predication from './assets/man_9642077.png'




function HomePage() {
    console.log('2 passage');


    return (

        <div className='bodyHomePage' >

            <ul className='container_link_homePage'>
                <li className='container_link_homePage_item'>
                    <Link className='link' to='/weeklyMeeting'><img className='link_img' src={reunion} alt="image qui représente la section Réunions de semaine " />
                    <div className='div_span_Homepage'> 
                        <span className='link_homePage_span'>Réunions de semaine</span>
                    </div>
                    </Link>
                </li>

                <li className='container_link_homePage_item'><Link  className='link'to='/discours'><img className='link_img' src={discours} alt="image qui représente la section Discours" />
                    <div className='div_span_Homepage'>
                        <span className='link_homePage_span'>Discours</span>
                    </div>
                    </Link></li>

                <li className='container_link_homePage_item'><Link className='link' to='/predication'><img className='link_img'src={predication} alt="image qui représente la section Prédication " />
                    <div className='div_span_Homepage'>
                        <span className='link_homePage_span'>Prédication</span>
                    </div>
                    </Link></li>

                <li className='container_link_homePage_item'><Link className='link' to='/documents'><img className='link_img' src={documents} alt="image qui représente la section Documents " />
                    <div className='div_span_Homepage'>
                        <span className='link_homePage_span'>Documents</span>
                    </div>
                    </Link></li>

            </ul>
        </div>


    )
}

export default HomePage