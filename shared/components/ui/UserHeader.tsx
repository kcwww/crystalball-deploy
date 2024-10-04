'use client';

const UserHeader = ({ user }: { user: string }) => {
  return (
    <header className="flex gap-1">
      <h1 className="user-header">{user}</h1> <p>님의 수정 구슬</p>
    </header>
  );
};

export default UserHeader;
