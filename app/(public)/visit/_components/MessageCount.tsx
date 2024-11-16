const MessageCount = ({ count }: { count: number }) => {
  return (
    <div
      className="flex items-center gap-2 text-white"
      style={{
        textShadow:
          '-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black',
      }}
    >
      <p style={{ fontSize: '1.5rem' }}>💌</p>{' '}
      <p style={{ fontSize: '1.3rem' }}>{count} / 30</p>
    </div>
  );
};

export default MessageCount;
