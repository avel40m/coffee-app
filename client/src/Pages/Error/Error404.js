import './error404.styles.css';

const Error404 = ({code,texto}) => {
  return (
    <div className='container'>
      <p className='error'>{code}</p>
      <div className='error-img'>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-coffee" width="60" height="60" viewBox="0 0 24 24" stroke="#7f5345" fill="none">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1" />
            <path d="M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" />
            <path d="M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" />
            <path d="M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5z" />
            <path d="M16.746 16.726a3 3 0 1 0 .252 -5.555" />
        </svg>

      </div>
      <span className='message'>{texto}</span>
    </div>
  )
}

export default Error404
