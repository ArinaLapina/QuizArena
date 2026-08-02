package quizarena;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class GameResultTest {

    @Test
    void gameResultStoresPlayerNameAndScore() {
        GameResult gameResult = new GameResult("Arina", 8);

        assertEquals("Arina", gameResult.getPlayerName());
        assertEquals(8, gameResult.getScore());
    }

    @Test
    void gameResultCanBeChanged() {
        GameResult gameResult = new GameResult("Arina", 5);

        gameResult.setPlayerName("Anna");
        gameResult.setScore(10);

        assertEquals("Anna", gameResult.getPlayerName());
        assertEquals(10, gameResult.getScore());
    }
}
