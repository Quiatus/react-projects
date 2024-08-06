export default function TextBloc({data}) {
  return (
    <div className='text-bloc comp'>
      {
        data.map(item => (<Bloc title={item.title} text={item.text} />))
      }
    </div>
  )
}

function Bloc({ title, text }) {
  return (
    <div className='textBlock'>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  )
}
