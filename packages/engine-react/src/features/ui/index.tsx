import Game from '../game';

const Ui = () => {
  return (
    <div>
      <div className="absolute inset-0 z-0">
        <Game />
      </div>
      <main className="relative z-10 w-full h-full pointer-events-none">
        <div className="container mx-auto p-4 pointer-events-auto">
          <h1 className="text-white text-4xl font-bold">Card Game</h1>
        </div>
      </main>
    </div>
  );
};

export default Ui;
