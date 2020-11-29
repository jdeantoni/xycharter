Feature: We can add points to the figure


  Scenario Outline: A point will be added to the figure
    Given there's a empty figure
    When we want to add the point (<x>,<y>) to the figure
    Then the number of point in the figure is increased
    Examples:
      | x | y |
      | 1 | 1 |