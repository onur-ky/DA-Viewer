import React, { useState } from 'react';
import './App.css';
import Select from './Select';
import Spinner from './Spinner';
import { Style } from 'react-style-tag';

const PathwayChoices: string[] = [
  'tca'
]

const KOGroupChoices: string[] = [
  'K01682', 'K00247', 'K18118', 'K18860', 'K00162', 'K00174', 'K00031', 'K01677',
  'K01899', 'K01676', 'K00175', 'K00030', 'K00163', 'K00026', 'K13997', 'K00246',
  'K01958', 'K00164', 'K00172', 'K00627', 'K00236', 'K00241', 'K01903', 'K01647',
  'K01610', 'K01596', 'K00169', 'K00240', 'K01902', 'K00237', 'K01959', 'K00234',
  'K01960', 'K00170', 'K05942', 'K17753', 'K00242', 'K01900', 'K00239', 'K00171',
  'K01648', 'K00235'
]


function App(): JSX.Element {
  const [hmDisplay, sethmDisplay] = useState(
    <p>You haven't generated a table yet.</p>
  );
  const [pathway, setPathway] = useState(PathwayChoices[0]);
  const [group, setGroup] = useState(KOGroupChoices.sort().reverse()[0]);
  const [exportDisplay, setExportDisplay] = useState(<div></div>);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sethmDisplay(<Spinner text='This may take a while.' width={196} height={196}/>)
    let fetch_url: URL = new URL('https://daviewer-backe-prod-da-viewer-lxp5z6.mo1.mogenius.io/heatmap');
    fetch_url.searchParams.append('pathway', pathway);
    fetch_url.searchParams.append('group', group);

    fetch(fetch_url)
      .then(res => res.json())
      .then(
        (result) => {
          sethmDisplay(
            <div>
              <div className='hm-table' dangerouslySetInnerHTML={{ __html: result.html }}></div>
              <Style>
                {result.style}
              </Style>
            </div>
          )
        },
        (error) => {
          sethmDisplay(<p>An error occurred while communicating with the server.</p>)
          console.log(error)
        }
      )
  }


  const handleExportClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setExportDisplay(<Spinner width={20} height={20}/>);
    let fetch_url: URL = new URL('https://daviewer-backe-prod-da-viewer-lxp5z6.mo1.mogenius.io/heatmap/csv');
    fetch_url.searchParams.append('pathway', pathway);
    fetch_url.searchParams.append('group', group);

    fetch(fetch_url)
    .then(res => {
      res.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = `${pathway}_${group}.csv`;
        a.click();
      });
    })
    .then(
      (result) => {
        setExportDisplay(<p>Success!</p>);
      },
      (error) => {
        setExportDisplay(<p>An error occurred.</p>);
        console.log(error);
      }
    )
  }

  return (
    <div className="App">
      <div className='content'>
        <div className='main card'>
          <div className='form-wrapper'>
            <form onSubmit={handleSubmit}>
              <Select label="Pathway" setStateProp={setPathway}>
                {PathwayChoices}
              </Select>
              <Select label="KO Group" setStateProp={setGroup}>
                {KOGroupChoices.sort().reverse()}
              </Select>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className='export-wrapper'>
              <button className='btn csv_export' onClick={handleExportClick}>Export as csv</button>
              <div className='export-display'>
                {exportDisplay}
              </div>
            </div>
          </div>
          <div className='heatmap'>
            {hmDisplay}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
