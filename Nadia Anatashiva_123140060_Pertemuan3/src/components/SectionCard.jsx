import React from 'react';
import PropTypes from 'prop-types';

const SectionCard = ({ title, children }) => {
  return (
    <section>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
};

SectionCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default SectionCard;