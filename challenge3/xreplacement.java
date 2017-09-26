// Dependencies
import java.util.Collections;
import java.util.ArrayList;

public class xreplacement {
    public static void main(String[] args) {
        // grab string from command line arguments
        String inputStr = args[0];
        char[] input = inputStr.toCharArray();
        int size = input.length;
        ArrayList<Integer> blankSpots = new ArrayList<Integer>();
        // Find x indices and add them to blankSpots
        for (int i = 0; i < input.length; i++) {
            if (input[i] == 'X' || input[i] == 'x') {
                blankSpots.add(i);
            }
        }
        Collections.reverse(blankSpots);
        double[] counter = new double[size];
        boolean[] state = new boolean[size];
        for (int i = 0; i<blankSpots.size(); i++) {
            state[i] = false;
            counter[i] = Math.pow(2, i);
        }
        double totalLength = Math.pow(2, blankSpots.size());
        // Find all combinations
        for (int currentTotal = 0; currentTotal < totalLength; currentTotal++) {
            char[] temp = input;
            // Adjust the input array
            // for each xSpot, set the character according to the state and update the counter for the xSpot
            for (int i = 0; i < blankSpots.size(); i++) {
                // change states when counter decrements to 1 and reset the counter
                if (counter[i] == 1) {
                    if (state[i] == false) {
                        state[i] = true;
                        temp[blankSpots.get(i)] = '0';
                    } else {
                        state[i] = false;
                        temp[blankSpots.get(i)] = '1';
                    }
                    counter[i] = Math.pow(2, i);
                } else {
                    // adjust the xSpots according to the state of that index, decrement the counter
                    if (state[i] == false) {
                        temp[blankSpots.get(i)] = '0';
                    } else {
                        temp[blankSpots.get(i)] = '1';
                    }
                    counter[i] = counter[i] - 1;
                }
            }
            // print new combination
            System.out.println(String.valueOf(temp));
        }
    }
}
