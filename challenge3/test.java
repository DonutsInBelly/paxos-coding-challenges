public class test {
    public static void main(String[] args) {
        String input = "XXXXXXXXXXXXXXXXXXXXXXXXX";
        int[] blankSpots = new int[25];
        double[] counter = new double[25];
        boolean[] state = new boolean[25];
        for (int i = 0; i<blankSpots.length; i++) {
            blankSpots[i] = blankSpots.length - i - 1;
        }
        for (int i = 0; i<blankSpots.length; i++) {
            state[i] = false;
            counter[i] = Math.pow(2, i);
        }
        double totalLength = Math.pow(2, blankSpots.length);
        int currentTotal = 0;
        while (currentTotal < totalLength) {
            char[] temp = input.toCharArray();
            for (int i = 0; i < blankSpots.length; i++) {
                if (counter[i] == 1) {
                    if (state[i] == false) {
                        state[i] = true;
                        temp[blankSpots[i]] = '0';
                    } else {
                        state[i] = false;
                        temp[blankSpots[i]] = '1';
                    }
                    counter[i] = Math.pow(2, i);
                } else {
                    if (state[i] == false) {
                        temp[blankSpots[i]] = '0';
                    } else {
                        temp[blankSpots[i]] = '1';
                    }
                    counter[i] = counter[i] - 1;
                }
            }
            System.out.println(String.valueOf(temp));
            currentTotal++;
        }
    }
}
