import Header from './Header'
import Content from './Content'



class App extends React.Component {
    render() { 
        return ( 
            <div className="notificationsFrame">
                <div className="panel">
                    <Header />
                    <Content />
                </div>
            </div>
         );
    }
}
 
export default App;