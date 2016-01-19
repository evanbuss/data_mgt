### Format NegCulture Table and Insert into SQL Database
library(xlsx)

# set working directory
setwd("~/Desktop/data")

# get data
negCulture <- read.xlsx("ClinicalSamples_parsedToDb.xlsx", 8)

# look-up table
lookUp <- read.csv("lookup_evan.csv")
tail(lookUp)
lookUp$TEST.MNEMONIC <- toupper(lookUp$TEST.MNEMONIC)


#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
#~~~~ neg-culture look-up ~~~~~~#
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#

head(negCulture)
head(lookUp)

merged.data.negCulture <- merge(negCulture, lookUp, by="TEST.MNEMONIC", all=TRUE)
tail(merged.data.negCulture)

toBeRemoved <- which(merged.data.negCulture$Test_Organism=="")
merged.data.negCulture.clean <- merged.data.negCulture[-toBeRemoved,]

# merging
merged.data.negCulture.summary <- summary(merged.data.negCulture.clean$Test_Organism)
negCulture.summary.melted <- melt(merged.data.negCulture.summary)

# remove duplicates before merge
dups <- duplicated(lookUp$TEST.MNEMONIC)
dups <- grep("FALSE", dups)
lookUp.no_repeat <- lookUp[dups,]

# merge with new lookup without repeats
merged.data.negCulture.no_repeat <- merge(negCulture, lookUp.no_repeat, by="TEST.MNEMONIC", all=TRUE)
head(merged.data.negCulture.no_repeat)

# remove rows with empty organism field
toBeRemoved <- which(merged.data.negCulture.no_repeat$Test_Organism=="")
merged.data.negCulture.clean.no_repeat <- merged.data.negCulture.no_repeat[-toBeRemoved,]

names(merged.data.negCulture.clean.no_repeat)
