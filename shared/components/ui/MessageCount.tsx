const MessageCount = ({ count }: { count: number }) => {
  return (
    <div className="flex items-center gap-2">
      <p style={{ fontSize: '1.5rem' }}>💌</p> <p>총 {count}개의 메시지</p>
    </div>
  );
};

export default MessageCount;
