package z.practice.farm;

import java.sql.SQLOutput;
import java.util.*;

public class FarmMenu {
    private Scanner sc = new Scanner(System.in);
    private FarmController fc = new FarmController();

    public void mainMenu() {
        System.out.println("========== KH 마트 ==========");
        while (true) {
            System.out.println("******* 메인 메뉴 *******");
            System.out.println("1. 직원메뉴 ");
            System.out.println("2. 손님 메뉴");
            System.out.println("9. 종료");
            System.out.println();
            System.out.print("메뉴 번호 선택 : ");
            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {
                case 1 -> {
                    adminMenu();
                }
                case 2 -> {
                    customerMenu();
                }
                case 9 -> {
                    System.out.println("프로그램 종료");
                    return;
                }
                default -> {
                    System.out.println("잘못 입력하였습니다. 다시 입력해주세요");
                }
            }
        }

    }

    public void adminMenu() {
        while (true) {
            System.out.println("******* 직원 메뉴 *******");
            System.out.println("1. 새 농산물 추가 ");
            System.out.println("2. 종류 삭제");
            System.out.println("3. 수량 수정");
            System.out.println("4. 농산물 목록 ");
            System.out.println("9. 메인으로 돌아가기 ");
            System.out.println();
            System.out.print("메뉴 번호 선택 : ");
            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {
                case 1 -> {
                    addNewKind();
                }
                case 2 -> {
                    removeKind();
                }
                case 3 -> {
                    changeAmount();
                }
                case 4 -> {
                    printFarm();
                }
                case 9 -> {
                    System.out.println("메인으로 돌아가기");
                    return;
                }
                default -> {
                    System.out.println("잘못 입력하였습니다. 다시 입력해주세요");
                }
            }
        }
    }

    public void customerMenu() {
        while (true) {
            System.out.println("******* 고객 메뉴 *******");
            System.out.println("1. 농산물 사기");
            System.out.println("2. 농산물 빼기");
            System.out.println("3. 구입한 농산물 보기");
            System.out.println("9. 메인으로 돌아가기");
            System.out.println();
            System.out.print("메뉴 번호 선택 : ");
            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {
                case 1 -> {
                    buyFarm();
                }
                case 2 -> {
                    removeFarm();
                }
                case 3 -> {
                    printBuyFarm();
                }
                case 9 -> {
                    return;
                }
                default -> {
                    System.out.println("잘못 입력하였습니다. 다시 입력해주세요");
                }
            }
        }

    }

    public void addNewKind() {
        while (true) {
            System.out.println("1. 과일 / 2. 채소 / 3. 견과");
            System.out.print("추가할 종류 번호 : ");
            String kind = sc.nextLine();

            System.out.print("이름 : ");
            String name = sc.next();

            System.out.print("수량 : ");
            int amount = sc.nextInt();
            sc.nextLine();

            switch (kind) {
                case "1" -> {
                    Fruit fruit = new Fruit("과일", name);
                    boolean add = fc.addNewKind(fruit, amount);
                    if (add) {
                        System.out.println("새 농산물이 추가되었습니다.");
                        return;
                    } else {
                        System.out.println("새 농산물 추가에 실패하였습니다. 다시 입력해주세요.");
                    }
                }
                case "2" -> {
                    Vegetable vegetable = new Vegetable("채소", name);
                    boolean add = fc.addNewKind(vegetable, amount);
                    if (add) {
                        System.out.println("새 농산물이 추가되었습니다.");
                        return;
                    } else {
                        System.out.println("새 농산물 추가에 실패하였습니다. 다시 입력해주세요.");
                    }
                }
                case "3" -> {
                    Nut nut = new Nut("견과", name);
                    boolean add = fc.addNewKind(nut, amount);
                    if (add) {
                        System.out.println("새 농산물이 추가되었습니다.");
                        return;
                    } else {
                        System.out.println("새 농산물 추가에 실패하였습니다. 다시 입력해주세요.");
                    }
                }
                default -> {
                    System.out.println("잘못 입력하셨습니다. 다시 입력해주세요.");
                }
            }
        }
    }

    public void removeKind() {
        while (true) {
            System.out.println("1. 과일 / 2. 채소 / 3. 견과");
            System.out.print("삭제할 종류 번호 : ");
            String kind = sc.nextLine();

            System.out.print("이름 : ");
            String name = sc.next();
            sc.nextLine();

            switch (kind) {
                case "1" -> {
                    Fruit fruit = new Fruit("과일", name);
                    boolean add = fc.removeKind(fruit);
                    if (add) {
                        System.out.println("농산물 삭제에 성공하였습니다.");
                        return;
                    } else {
                        System.out.println("새 농산물 삭제에 실패하였습니다. 다시 입력해주세요.");
                    }
                }
                case "2" -> {
                    Vegetable vegetable = new Vegetable("채소", name);
                    boolean add = fc.removeKind(vegetable);
                    if (add) {
                        System.out.println("농산물 삭제에 성공하였습니다.");
                        return;
                    } else {
                        System.out.println("새 농산물 삭제에 실패하였습니다. 다시 입력해주세요.");
                    }
                }
                case "3" -> {
                    Nut nut = new Nut("견과", name);
                    boolean add = fc.removeKind(nut);
                    if (add) {
                        System.out.println("농산물 삭제에 성공하였습니다.");
                        return;
                    } else {
                        System.out.println("새 농산물 삭제에 실패하였습니다. 다시 입력해주세요.");
                    }
                }
                default -> {
                    System.out.println("잘못 입력하셨습니다. 다시 입력해주세요.");
                }
            }
        }
    }

    public void changeAmount() {
        while (true) {
            System.out.println("1. 과일 / 2. 채소 / 3. 견과");
            System.out.print("수정할 종류 번호 : ");
            String kind = sc.nextLine();

            System.out.print("이름 : ");
            String name = sc.next();

            System.out.print("수량 : ");
            int amount = sc.nextInt();
            sc.nextLine();

            switch (kind) {
                case "1" -> {
                    Fruit fruit = new Fruit("과일", name);
                    boolean add = fc.changeAmount(fruit, amount);
                    if (add) {
                        System.out.println("농산물 수량이 수정되었습니다.");
                        return;
                    } else {
                        System.out.println("농산물 수량 수정에 실패하였습니다. 다시 입력해주세요.");
                    }
                }
                case "2" -> {
                    Vegetable vegetable = new Vegetable("채소", name);
                    boolean add = fc.changeAmount(vegetable, amount);
                    if (add) {
                        System.out.println("농산물 수량이 수정되었습니다.");
                        return;
                    } else {
                        System.out.println("농산물 수량 수정에 실패하였습니다. 다시 입력해주세요.");
                    }
                }
                case "3" -> {
                    Nut nut = new Nut("견과", name);
                    boolean add = fc.changeAmount(nut, amount);
                    if (add) {
                        System.out.println("농산물 수량이 수정되었습니다.");
                        return;
                    } else {
                        System.out.println("농산물 수량 수정에 실패하였습니다. 다시 입력해주세요.");
                    }
                }
                default -> {
                    System.out.println("잘못 입력하셨습니다. 다시 입력해주세요.");
                }
            }
        }
    }

    public void printFarm() {
        HashMap<Farm, Integer> pf = fc.printFarm();
        for (Farm farm : pf.keySet()) {
            if (farm instanceof Fruit) {
                System.out.println(farm.getKind()+" : " + ((Fruit) farm).getName() + "(" + pf.get(farm)  + ")개");
            } else if (farm instanceof Vegetable) {
                System.out.println(farm.getKind()+" : " + ((Vegetable) farm).getName()+ "(" + pf.get(farm)  + ")개");
            } else if (farm instanceof Nut) {
                System.out.println(farm.getKind()+" : " + ((Nut) farm).getName()+ "(" + pf.get(farm)  + ")개");
            }
        }
    }

    public void buyFarm() {
        while (true) {
            System.out.println("1. 과일 / 2. 채소 / 3. 견과");
            System.out.print("추가할 종류 번호 : ");
            String kind = sc.nextLine();

            System.out.print("이름 : ");
            String name = sc.next();
            sc.nextLine();

            switch (kind) {
                case "1" -> {
                    Fruit fruit = new Fruit("과일", name);
                    boolean add = fc.buyFarm(fruit);
                    if (add) {
                        System.out.println("구매에 성공하였습니다.");
                        return;
                    } else {
                        System.out.println("마트에 없는 물건이거나 수량이 없습니다. 다시 입력해주세요.");
                    }
                }
                case "2" -> {
                    Vegetable vegetable = new Vegetable("채소", name);
                    boolean add = fc.buyFarm(vegetable);
                    if (add) {
                        System.out.println("구매에 성공하였습니다.");
                        return;
                    } else {
                        System.out.println("마트에 없는 물건이거나 수량이 없습니다. 다시 입력해주세요.");
                    }
                }
                case "3" -> {
                    Nut nut = new Nut("견과", name);
                    boolean add = fc.buyFarm(nut);
                    if (add) {
                        System.out.println("구매에 성공하였습니다.");
                        return;
                    } else {
                        System.out.println("마트에 없는 물건이거나 수량이 없습니다. 다시 입력해주세요.");
                    }
                }
                default -> {
                    System.out.println("잘못 입력하셨습니다. 다시 입력해주세요.");
                }
            }
        }
    }

    public void removeFarm() {
        while (true) {
            System.out.println("1. 과일 / 2. 채소 / 3. 견과");
            System.out.print("추가할 종류 번호 : ");
            String kind = sc.nextLine();

            System.out.print("이름 : ");
            String name = sc.next();
            sc.nextLine();

            switch (kind) {
                case "1" -> {
                    Fruit fruit = new Fruit("과일", name);
                    boolean add = fc.removeFarm(fruit);
                    if (add) {
                        System.out.println("구매 취소에 성공하였습니다");
                        return;
                    } else {
                        System.out.println("마트에 없는 물건이거나 수량이 없습니다. 다시 입력해주세요.");
                    }
                }
                case "2" -> {
                    Vegetable vegetable = new Vegetable("채소", name);
                    boolean add = fc.removeFarm(vegetable);
                    if (add) {
                        System.out.println("구매 취소에 성공하였습니다");
                        return;
                    } else {
                        System.out.println("마트에 없는 물건이거나 수량이 없습니다. 다시 입력해주세요.");
                    }
                }
                case "3" -> {
                    Nut nut = new Nut("견과", name);
                    boolean add = fc.removeFarm(nut);
                    if (add) {
                        System.out.println("구매 취소에 성공하였습니다");
                        return;
                    } else {
                        System.out.println("구매 목록에 존재하지 않습니다. 다시 입력해주세요.");
                    }
                }
                default -> {
                    System.out.println("잘못 입력하셨습니다. 다시 입력해주세요.");
                }
            }
        }
    }

    public void printBuyFarm() {
        ArrayList<Farm> pb = fc.printBuyFarm();

        Iterator<Farm> it = pb.iterator();

        while(it.hasNext()) {
            Farm farm = it.next();
            System.out.println(farm);
        }
        System.out.println();
        System.out.println("현재 KH마트 농산물 수량");
        this.printFarm();
    }
}
