const VisitPage = ({ params }: { params: { userId: string } }) => {
  return (
    <div>
      <h1>Visit Page</h1>
      <p>userId: {params.userId}</p>
    </div>
  );
};

export default VisitPage;
