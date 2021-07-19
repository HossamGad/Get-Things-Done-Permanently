API
API:et ska vara tillgänglig publikt för alla, men all funktionalitet, 
undantaget att logga in eller registera sig, att ska begränsas till inloggade och auktoriererade användare!

Krav:
[x] Din API lösning ska vara byggt i ASP.NET Core, version 3.0 eller 3.1.
[x] En användare ska kunna registerara sig, logga in & logga ut i API:et.
[x] En användare ska med hänsyn till GDPR kunna ta bort sig själv ur systemet.
[x] En uppgift ska alltid vara kopplad till en lista.
[x] En lista tillhör alltid en användare.
[x] Listor har ett givet namn samt en beskrivning.
[x] Bara inloggade användare kan skapa nya listor och uppgifter.
[x] En uppgift kan markeras som utförd eller inte utförd.
[x] Man ska kunna ta bort både listor och uppgifter, samt uppdatera alla detaljer.
[x] En uppgift har en titel som beskriver vad som ska göras samt en lista med taggar.
[x] Man ska via en åtkomstpunkt kunna söka på uppgifter i alla sina listor efter vilka taggar den har.
[x] En användare ska kan bjuda in andra användare till en lista.
[] En inbjuden användare kan se och markera uppgifter i listan som avklarade.
[x] Bara användaren som skapade listan kan ta bort en uppgift eller listan.
[x] Endast användaren som skapade listan ska ha möjlighet att skapa nya uppgifter.
[x] Autentisering och tillståndshantering ska vara implementerat med ett lämplig säkerhetsramverk, exempelvis Core Identity.
[x] Uppgifter och listor ska sparas permanent i en databas och finnas kvar mellan körningar av API:et.
[x] Samtliga åtkomstpunkter förutom registrering och inloggning ska vara skyddade från åtkomst av icke-auktoriserade anrop.

En uppgift:
Huvudresursen i API:et kommer att vara uppgifter som måste utföras, todos, en typiskt todo kan visualiseras så här:

Exempelbild från en kommersiell GTD applikation: Things 3
Vad vi ser här är en Todo: Ta en cykeltur nästan gång det är soligtsom har flera taggar: utomhus, värnamo, hälsa, fintvänder. Den ligger i en lista: "Min Lista", som har beskrivningen "Detta är ett exempel på en lista".
 
Tips:
En viktig aspekt av API:et är att man kan lägga till andra användare i sina listor som kan se och utföra uppgifter, men inte ändra något annat. Detta gör det möjligt att sammarbeta kring vad som behöver göras, och viktigt att du får en bra struktur på detta. GÅr det kanske att tänka på detta som olika användarnivåer?
En annan viktig aspekt är taggarna på varje uppgift. Listan som taggen ligger i avgör varför en uppgift behöver göras, men genom att exempelvis söka på taggen #fintväder kan en användare se alla uppgifter som hen kan få gjort på en dag då det är soligt ute. ☀️
 
 
Klientgränsnittet
Det är viktigt för att din affärspartner ska kunna testa och använda systemet, och sälja in det till potentiella kunder att det finns någon typ av klientgränsnitt. I detta tidiga skede av utvecklingen så behöver det dock inte vara vackert!
 
Krav:
Alla ovanstående krävda funktioner i API:et ska alla gå att använda från klientgränsnittet.
Man ska kunna logga in och ut ur systemet, och hämta sina listor och uppgifter från API:et.
Systemet måste vara användbart men inte användarvänligt.
 
Tips:
Tänk på att din valda säkerhetsmetodik i ditt API ställer olika krav på en fungerande struktur på klientsidan. Exempelvis hur du ser till att din JWT eller säkerhetskoder följer med i efterföljande anrop efter att du loggat in. Gränsnittet behöver inte vara snyggt utan kan fungera endast för att visualisera att ditt API fungerar så som du designat det. Kom ihåg att i din rapport beskriva hur du tänkt kring din struktur på klientsidan och ev. val gällande användarbarhet.
 
 
Rapporten
Du ska även denna gång lämna in en teknisk rapport som reflekterar och motiverar designvalen gjorda för att skapa din lösning.
 
Krav:
Rapporten ska innehålla...
En länk till gitrepot med implementationen av REST APIet och ett tillhörande klientgränsnitt.
En mycket kort dokumentation över åtkomstpunkterna i API:et och vad dom retunerar för information.
En kort reflektion över utformningen av API:et för att uppfylla kraven, och över användarbetheten hos klientgränsnittet.
 
Tips:
Tänk på att motivera dina ställningstaganden för att uppnå högre betyg på uppgiften! Svara förslagsvis på följande frågor i din rapport:
På vilket sätt sparas uppgifterna i databasen?
Vilken säkerhetslösning är implementerad i API:et
Hur garanteras det att inte information lämnas till obehöriga anrop?
Används några åtkomstpunkter som är funktionella, av vilken anledning?
Används någon form av versionering, varför/varför inte?
 
 
Kom igång
Börja med att identifiera och skissa upp hur ditt nya API skall fungera. Använd med fördel ett entitetsdiagram för att visualisera relationer mellan de resurser/datamodeller du skapar. Fundera på om du behöver några funktionella delar av ditt API, och kom ihåg att motivera valet av dessa i din rapport. I denna uppgift är det ett krav att använda en databas, så förslagsvis så bygger du en fungerande datamodell först, implementerar entiteterna som behövs och testar detta innan du kommer för långt med ditt klientgränsnitt.
Tänk på att påbörja skrivandet av din rapport under tiden du implementerar din kod, för ett bättre resultat på både kod och rapport.
Både klientgränsnittet och REST API:et ska ligga i samma GIT Repo, använd med fördel följande länk för att skapa ett nytt repo från GitHub Classroom som är förberett för inlämning:
 