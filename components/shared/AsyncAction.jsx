// react
import { useState, useEffect } from 'react';

// third-party
import PropTypes from 'prop-types';
import { useRef } from 'react';

const AsyncAction = ({ render, action }) => {
  const canceled = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    canceled.current = false
    return () => canceled.current = true
  }, [])

  const run = () => {
    if (loading || !action) {
      return;
    }
    setLoading(true)
    action().then((resp) => {
      if (canceled.current) {
        return;
      }
      setLoading(false)
    }).catch((err) => {
      if (canceled.current) {
        return;
      }
      setLoading(false)
    });
  };

  if (render) {
    return render({ run, loading });
  }

  return null;
}



AsyncAction.propTypes = {
  action: PropTypes.func,
  render: PropTypes.func,
};

export default AsyncAction;
