import React from 'react';
import './DetailItem.css';

interface DetailItemProps {
  title: string;
  description: string;
  dateModified?: string;
}

const DetailItem = ({ title, description, dateModified }: DetailItemProps) => {
  return (
    <div className="detail-item">
      <h3 className="detail-title">{title}</h3>
      <p className="detail-description">{description}</p>

      <p className="detail-date">Date Modified: {dateModified}</p>
    </div>
  );
};

export default DetailItem;
