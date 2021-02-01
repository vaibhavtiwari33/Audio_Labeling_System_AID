class FordCar implements Transferable {
    int numberOfSeats = 0;
  
    void soundHorn(int volume) {
      Sounds.soundHorn(volume);
    }
    
    void seats(int number) {
      numberOfSeats = number;
    }
  }
export {
    FordCar;
} 