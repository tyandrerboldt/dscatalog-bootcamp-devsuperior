import React from 'react';
import { ReactComponent as ArrowIcon } from 'core/assets/images/arrow.svg';
import './styles.scss';
import { generateList } from 'core/utils/list';

type Props = {
  totalPages: number;
  activePage: number;
  onChange: (item: number) => void;
}

const Pagination = ({totalPages, activePage, onChange}:Props) => {
  const items = generateList(totalPages);
  const previousCLass = totalPages > 0 && activePage > 0 ? 'page-active' : 'page-inactive';
  const nextCLass = (activePage + 1) < totalPages ? 'page-active' : 'page-inactive';

  return (
    <>
      <div className="pagination-container">
          <ArrowIcon 
            className={`pagination-previous ${previousCLass}`} 
            onClick={() => onChange(activePage - 1)}
          />
        {items.map(item => (
          <div 
            key={item}
            className={`pagination-item ${activePage === item && 'active'}`}
            onClick={() => onChange(item)}
            >
              {item + 1}
            </div>
        ))}
          <ArrowIcon 
            className={`pagination-next ${nextCLass}`} 
            onClick={() => onChange(activePage + 1)}
          />
      </div>
    </>
  )
}

export default Pagination;
