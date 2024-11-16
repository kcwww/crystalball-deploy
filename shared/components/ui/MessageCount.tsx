const MessageCount = ({ count }: { count: number }) => {
  return (
    <div className="flex items-center gap-2">
      <p style={{ fontSize: '1.5rem' }}>💌</p>{' '}
      <p
        className="flex justify-center text-white"
        style={{
          textShadow:
            '-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black',
        }}
      >
        총 {count}개의 메시지
      </p>
    </div>
  );
};

export default MessageCount;
