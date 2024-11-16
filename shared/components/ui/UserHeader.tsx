'use client';

const UserHeader = ({ user }: { user: string }) => {
  return (
    <header className="flex gap-1">
      <h1 className="user-header">{user}</h1>{' '}
      <p
        className="flex items-center text-white"
        style={{
          textShadow:
            '-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black',
        }}
      >
        님의 수정 구슬
      </p>
    </header>
  );
};

export default UserHeader;
