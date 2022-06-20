import React, { useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {useEffect, useState} from 'react'
import TransitionItem from './TransitionItem';



function AutoComplete ({names}) {
 const [inputVal, setInputVal] = useState('')
 const [showList, setShowList] = useState(false)

 const inputRef = useRef();


  useEffect(()=> {
    if (showList) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      console.log("Cleaning up event listener from Autocomplete!");
      document.removeEventListener('click', handleOutsideClick);
    }
  },[showList])


  const selectName = ({ target:  { innerText: name }}) => {
    setInputVal(name);
    setShowList(false)
  }

  const handleInput = (e) => {
    setInputVal( e.target.value );
  }



  // Set focus to input field if user clicks anywhere inside the Autocomplete
  // section (unless they have selected a name from the dropdown list)
  const handleAutocompleteSectionClick = ({ target }) => {
    if (!target.classList.contains("nameLi")) {
      inputRef.current.focus();
    }
  }

  const handleOutsideClick = () => {
    // Leave dropdown visible as long as input is focused
    if (document.activeElement === inputRef.current) return;
    else setShowList(false);
  }

  const matches = () => {
    // const { inputVal } = this.state;
    // const { names } = this.props;
    const inputLength = inputVal.length;
    const matches = [];

    if (inputLength === 0) return names;

    names.forEach(name => {
      const nameSegment = name.slice(0, inputLength);
      if (nameSegment.toLowerCase() === inputVal.toLowerCase()) {
        matches.push(name);
      }
    });

    if (matches.length === 0) matches.push('No matches');

    return matches;
  }


    const results = matches().map((result) => {

      return (
       <TransitionItem result={result} selectName={selectName} />
      )
    });

    return (
      <section
        className="autocomplete-section"
        onClick={handleAutocompleteSectionClick}
      >
        <h1>Autocomplete</h1>
        <div className="auto">
          <input
            placeholder="Search..."
            ref={inputRef}
            onChange={handleInput}
            value={inputVal}
            onFocus={() => setShowList(true)}
          />
          {showList && (
            <ul className="auto-dropdown">
              <TransitionGroup>
                {results}
              </TransitionGroup>
            </ul>
          )}
        </div>
      </section>
    );

}

export default AutoComplete;
