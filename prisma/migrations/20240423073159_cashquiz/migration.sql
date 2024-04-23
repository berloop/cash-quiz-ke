-- CreateTable
CREATE TABLE "TriviaQuestion" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "answer" TEXT NOT NULL,
    "showName" TEXT NOT NULL,

    CONSTRAINT "TriviaQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TriviaScore" (
    "id" TEXT NOT NULL,
    "showName" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "firstPlayedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "userphoneNumber" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userFirstName" TEXT,
    "userLastName" TEXT,
    "lastPlayedDate" TIMESTAMP(3),

    CONSTRAINT "TriviaScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TriviaScore_userId_key" ON "TriviaScore"("userId");
